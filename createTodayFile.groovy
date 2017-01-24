#!/usr/bin/env groovy
// def p = "/Users/yamap_55/github/yamap55/"
def s = this.class.protectionDomain.codeSource.location.path
def p = (s=~/^(.*)\//)[0][0]

def template = "template.md"

def newFilePath = p + new Date().format("yyyy/yyyyMM/yyyyMMdd.'md'")
new File(newFilePath) << new File("${p}${template}").text
println "create new file : ${newFilePath}"
